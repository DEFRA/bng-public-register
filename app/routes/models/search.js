function ViewModel () {
  this.model = {
    searchByReference: searchByReference()
  }
}

const searchByReference = () => {
  return {
    id: 'bng_reference',
    name: 'bng_reference',
    label: {
      text: 'Search for BNG record by reference',
      classes: 'govuk-!-font-weight-bold'
    },
    hint: {
      text: 'For example, BNG-123-456-789'
    },
    input: {
      classes: 'govuk-input--width-20'
    },
    button: {
      classes: 'search-button'
    }
  }
}

module.exports = ViewModel
