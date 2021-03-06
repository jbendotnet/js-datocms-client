import deserializeJsonApi from '../../deserializeJsonApi';
import serializeJsonApi from '../../serializeJsonApi';

export default class UserRepo {
  constructor(client) {
    this.client = client;
  }

  create(resourceAttributes) {
    const serializedResource = serializeJsonApi(
      resourceAttributes,
      {
        type: 'user',
        attributes: [
          'email',
          'firstName',
          'lastName',
          'isAdmin',
        ],
        requiredAttributes: [
          'email',
          'firstName',
          'lastName',
          'isAdmin',
        ],
      }
    );
    return this.client.post('/users', serializedResource)
    .then(response => Promise.resolve(deserializeJsonApi(response)));
  }

  update(userId, resourceAttributes) {
    const serializedResource = serializeJsonApi(
      userId,
      resourceAttributes,
      {
        type: 'user',
        attributes: [
          'email',
          'firstName',
          'lastName',
          'password',
          'isAdmin',
        ],
      }
    );
    return this.client.put(`/users/${userId}`, serializedResource)
    .then(response => Promise.resolve(deserializeJsonApi(response)));
  }

  all() {
    return this.client.get('/users')
    .then(response => Promise.resolve(deserializeJsonApi(response)));
  }

  find(userId) {
    return this.client.get(`/users/${userId}`)
    .then(response => Promise.resolve(deserializeJsonApi(response)));
  }

  resetPassword(resourceAttributes) {
    const serializedResource = serializeJsonApi(
      resourceAttributes,
      {
        type: 'user',
        attributes: [
          'email',
        ],
        requiredAttributes: [
          'email',
        ],
      }
    );
    return this.client.post('/users/reset_password', serializedResource)
    .then(response => Promise.resolve(deserializeJsonApi(response)));
  }

  destroy(userId) {
    return this.client.delete(`/users/${userId}`)
    .then(response => Promise.resolve(deserializeJsonApi(response)));
  }

}
