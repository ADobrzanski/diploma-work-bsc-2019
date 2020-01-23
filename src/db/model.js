const tables = {
  USER: 'users',
  SCORE: 'scores',
  CREDENTIAL: 'credentials',
  SHARE: 'shares',
}

const {
  USER,
  SCORE,
  CREDENTIAL,
  SHARE,
} = tables;

const schemaOf = {
  [USER]: {
    f_id: 'id',
    f_name: 'name',
    f_email: 'email',
    f_searchable: 'searchable',
  },
  [SCORE]: {
    f_id: 'id',
    f_createdAt: 'created_at',
    f_title: 'title',
    f_subtitle: 'subtitle',
    f_composer: 'composer',
    f_lyricist: 'lyricist',
    f_ownerId: 'owner_id',
    f_isPrivate: 'private',
    f_objectKey: 'object_key',
  },
  [CREDENTIAL]: {
    f_user_id: 'user_id',
    f_password: 'password',
  },
  [SHARE]: {
    f_score_id: 'score_id',
    f_user_id: 'user_id',
  },
}

module.exports = {
  tables,
  schemaOf,
}