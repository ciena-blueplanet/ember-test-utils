import DS from 'ember-data'

export default DS.JSONAPIAdapter.extend({
  generateIdForRecord () {
    const id = this._super(...arguments)
    return `${id}-customized`
  }
})
