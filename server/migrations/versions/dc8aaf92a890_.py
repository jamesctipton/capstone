"""empty message

Revision ID: dc8aaf92a890
Revises: 38cc95797964
Create Date: 2022-11-22 14:55:41.781170

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'dc8aaf92a890'
down_revision = '38cc95797964'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('poll', sa.Column('pollCode', sa.String(length=8), nullable=True))
    op.add_column('poll', sa.Column('option1', sa.PickleType(), nullable=True))
    op.add_column('poll', sa.Column('option2', sa.PickleType(), nullable=True))
    op.add_column('poll', sa.Column('option3', sa.PickleType(), nullable=True))
    op.add_column('poll', sa.Column('option4', sa.PickleType(), nullable=True))
    op.add_column('poll', sa.Column('option5', sa.PickleType(), nullable=True))
    op.add_column('poll', sa.Column('totalVotes', sa.Integer(), nullable=True))
    op.create_unique_constraint(None, 'poll', ['pollCode'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'poll', type_='unique')
    op.drop_column('poll', 'totalVotes')
    op.drop_column('poll', 'option5')
    op.drop_column('poll', 'option4')
    op.drop_column('poll', 'option3')
    op.drop_column('poll', 'option2')
    op.drop_column('poll', 'option1')
    op.drop_column('poll', 'pollCode')
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
