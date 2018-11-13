from .base import db, Column


class TimestampMixin(object):
    updated_at = Column(db.DateTime(True), default=db.func.now(),
                        onupdate=db.func.now(), nullable=False)
    created_at = Column(db.DateTime(True), default=db.func.now(),
                        nullable=False)


class BelongsToOrgMixin(object):
    @classmethod
    def get_by_id_and_org(cls, object_id, org):
        return db.session.query(cls).filter(cls.id == object_id, cls.org == org).one()
