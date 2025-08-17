from datetime import datetime, timedelta
from fastapi import Body, FastAPI, Request, HTTPException, Depends, Header
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import jwt
from utils import (
    create_tables,
    get_all_eleves,
    get_all_classes,
    create_user,
    connect_user,
)

# ⚠️ Mettre en .env en prod
JWT_SECRET = "MaSuperCleSecrete123"
JWT_ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 15
REFRESH_TOKEN_EXPIRE_DAYS = 7

app = FastAPI()

# Middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # autorise toutes les origines pour dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

create_tables()  # Crée les tables à l'initialisation


# --- JWT utils ---
def create_jwt(user_id: int, expires_delta: timedelta):
    payload = {"user_id": user_id, "exp": datetime.utcnow() + expires_delta}
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


def verify_jwt(token: str):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload["user_id"]
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


# --- Auth dependency ---
def get_current_user(authorization: str = Header(...)):
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid auth header")
    token = authorization.split(" ")[1]
    user_id = verify_jwt(token)
    return user_id


# --- Endpoints ---
@app.post("/api/register")
async def register_user(request: Request):
    data = await request.json()
    username = data.get("username")
    password = data.get("password")
    last_name = data.get("last_name")
    first_name = data.get("first_name")
    email = data.get("email")

    if not all([username, password, last_name, first_name, email]):
        raise HTTPException(status_code=400, detail="Missing fields")

    user = create_user(username, password, last_name, first_name, email, is_admin=False)
    if "error" in user:
        raise HTTPException(status_code=400, detail=user["error"])

    return JSONResponse(content=user)


@app.post("/api/login")
async def login_user(request: Request):
    data = await request.json()
    username = data.get("username")
    password = data.get("password")

    user = connect_user(username, password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_jwt(
        user["id"], timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    refresh_token = create_jwt(user["id"], timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS))

    return JSONResponse(
        content={
            "user": user,
            "access_token": access_token,
            "refresh_token": refresh_token,
        }
    )


@app.post("/api/token/refresh")
async def refresh_token_endpoint(data: dict = Body(...)):
    refresh_token = data.get("refresh")
    if not refresh_token:
        raise HTTPException(status_code=400, detail="Missing refresh token")

    user_id = verify_jwt(refresh_token)
    new_access_token = create_jwt(
        user_id, timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    return JSONResponse(content={"access": new_access_token})


# --- Endpoints protégés ---
@app.get("/api/eleves")
async def list_eleves(user_id: int = Depends(get_current_user)):
    eleves = get_all_eleves(user_id)
    return eleves


@app.get("/api/classes")
async def list_classes(user_id: int = Depends(get_current_user)):
    classes = get_all_classes(user_id)
    return classes
