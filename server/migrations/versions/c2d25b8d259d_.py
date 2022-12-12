"""empty message

Revision ID: c2d25b8d259d
Revises: 512d604ecd8e
Create Date: 2022-12-12 15:08:59.348496

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'c2d25b8d259d'
down_revision = '512d604ecd8e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('poll_option',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('optionname', sa.String(length=256), nullable=True),
    sa.Column('latitude', sa.Float(), nullable=True),
    sa.Column('longitude', sa.Float(), nullable=True),
    sa.Column('countryCode', sa.String(length=4), nullable=True),
    sa.Column('votes', sa.Integer(), nullable=True),
    sa.Column('image', sa.Text(length=4294000000), nullable=True),
    sa.Column('poll_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['poll_id'], ['poll.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_poll_option_optionname'), 'poll_option', ['optionname'], unique=False)
    op.add_column('group', sa.Column('start_day', sa.String(length=64), nullable=True))
    op.add_column('group', sa.Column('start_month', sa.String(length=64), nullable=True))
    op.add_column('group', sa.Column('start_year', sa.String(length=64), nullable=True))
    op.add_column('group', sa.Column('end_day', sa.String(length=64), nullable=True))
    op.add_column('group', sa.Column('end_month', sa.String(length=64), nullable=True))
    op.add_column('group', sa.Column('end_year', sa.String(length=64), nullable=True))
    op.alter_column('group', 'groupimage',
               existing_type=mysql.LONGTEXT(),
               type_=sa.Text(length=4294000000),
               existing_nullable=True)
    op.drop_column('group', 'day')
    op.drop_column('group', 'year')
    op.drop_column('group', 'month')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('group', sa.Column('month', mysql.INTEGER(), autoincrement=False, nullable=True))
    op.add_column('group', sa.Column('year', mysql.INTEGER(), autoincrement=False, nullable=True))
    op.add_column('group', sa.Column('day', mysql.INTEGER(), autoincrement=False, nullable=True))
    op.alter_column('group', 'groupimage',
               existing_type=sa.Text(length=4294000000),
               type_=mysql.LONGTEXT(),
               existing_nullable=True)
    op.drop_column('group', 'end_year')
    op.drop_column('group', 'end_month')
    op.drop_column('group', 'end_day')
    op.drop_column('group', 'start_year')
    op.drop_column('group', 'start_month')
    op.drop_column('group', 'start_day')
    op.create_table('group_user',
    sa.Column('group_id', mysql.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('user_id', mysql.INTEGER(), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['group_id'], ['group.id'], name='group_user_ibfk_1'),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], name='group_user_ibfk_2'),
    mysql_collate='utf8mb4_0900_ai_ci',
    mysql_default_charset='utf8mb4',
    mysql_engine='InnoDB'
    )
    op.drop_index(op.f('ix_poll_option_optionname'), table_name='poll_option')
    op.drop_table('poll_option')
    op.drop_table('Group_User')
    # ### end Alembic commands ###
