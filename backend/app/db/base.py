# Import all the models, so that Base has them before being
# imported by Alembic or used by init_db()
from app.db.base_class import Base
from app.models.user import User
from app.models.chat import Chat
from app.models.message import Message
from app.models.file import File
from app.models.log import Log
from app.models.access_key import AccessKey 