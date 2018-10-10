import DS from 'ember-data'

export default DS.JSONAPISerializer.extend({
  normalizeSingleResponse (store, primaryModelClass, payload, id, requestType) {
    payload.extraKey = 'extraKey'
    return this._normalizeResponse(store, primaryModelClass, payload, id, requestType, true)
  }
})
