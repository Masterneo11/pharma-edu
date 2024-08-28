"""Add person code

Revision ID: f6a5beb15e39
Revises: 5d9ceec257f3
Create Date: 2024-08-28 17:54:57.633168

"""
from typing import Sequence

from alembic import op
import sqlalchemy as sa
import sqlmodel


# revision identifiers, used by Alembic.
revision: str = 'f6a5beb15e39'
down_revision: str | None = '5d9ceec257f3'
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('patient', sa.Column('insurance_person_code', sqlmodel.sql.sqltypes.AutoString(), nullable=False))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('patient', 'insurance_person_code')
    # ### end Alembic commands ###
