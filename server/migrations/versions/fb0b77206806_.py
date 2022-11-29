"""empty message

Revision ID: fb0b77206806
Revises: 2cbc2df4ae13
Create Date: 2022-11-29 11:05:06.597608

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'fb0b77206806'
down_revision = '2cbc2df4ae13'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('group', sa.Column('groupimage', sa.String(length=16000000), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('group', 'groupimage')
    op.create_table('group_user',
    sa.Column('group_id', mysql.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('user_id', mysql.INTEGER(), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['group_id'], ['group.id'], name='group_user_ibfk_1'),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], name='group_user_ibfk_2'),
    mysql_collate='utf8mb4_0900_ai_ci',
    mysql_default_charset='utf8mb4',
    mysql_engine='InnoDB'
    )
    op.drop_table('Group_User')
    # ### end Alembic commands ###
