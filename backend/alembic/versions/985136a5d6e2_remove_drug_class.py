"""Remove drug class

Revision ID: 985136a5d6e2
Revises: 08a8f18ae616
Create Date: 2024-08-28 08:44:26.779235

"""
from typing import Sequence

from alembic import op
import sqlalchemy as sa
import sqlmodel


# revision identifiers, used by Alembic.
revision: str = '985136a5d6e2'
down_revision: str | None = '08a8f18ae616'
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('rxitem', 'expiration',
               existing_type=sa.DATE(),
               nullable=False)
    op.drop_column('rxitem', 'drug_class')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('rxitem', sa.Column('drug_class', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.alter_column('rxitem', 'expiration',
               existing_type=sa.DATE(),
               nullable=True)
    # ### end Alembic commands ###
