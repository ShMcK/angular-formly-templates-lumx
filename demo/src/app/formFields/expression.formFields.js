(function () {
  'use strict';

  angular.module('shmck.formFields.expression', [])
    .service('expressionFormFields', expressionFormFields)
    .config(stateRoutes);

  function expressionFormFields() {
    this.contents = {
      title: 'Expression Properties',
      docsLink: 'http://formly-js.github.io/angular-formly/#/example/intro/expression-properties'
    };


    this.formData = {
      showHidden: '',
      disableNextField: '',
      probablyNotNeeded: '',
      setMaxLength: 4,
      textWithSetMaxLength: 'four',
      editLabel: ''
    };

    this.fields = function () {
      return [{
        key: 'showHidden',
        type: 'lx-checkbox',
        templateOptions: {
          focus: true,
          label: 'Show Hidden Field'
        }
      }, {
        key: 'hiddenField',
        type: 'lx-title',
        templateOptions: {
          title: 'This Field was Hidden'
        },
        expressionProperties: {
          hide: '!model.showHidden'
        }
      }, {
        key: 'disableNextField',
        type: 'lx-checkbox',
        templateOptions: {
          label: 'Disable Next Field'
        }
      }, {
        key: 'probablyNotNeeded',
        type: 'lx-checkbox',
        templateOptions: {
          label: 'This Field Can Be Disabled',
        },
        expressionProperties: {
          'templateOptions.disabled': 'model.disableNextField'
        }
      }, {
        key: 'setMaxLength',
        type: 'lx-input',
        templateOptions: {
          type: 'number',
          label: 'Set the max length of the next text field'
        }
      }, {
        key: 'textWithSetMaxLength',
        type: 'lx-input',
        templateOptions: {
          label: 'Text with max length set'
        },
        ngModelAttrs: {
          maxLength: {
            bound: 'ng-maxlength'
          }
        },
        expressionProperties: {
          'templateOptions.maxLength': 'model.setMaxLength'
        }
      }, {
        key: 'editLabel',
        type: 'lx-input',
        templateOptions: {
          label: 'Text'
        },
        expressionProperties: {
          'templateOptions.label': '$viewValue || "Edit this label"'
        }
      }];
    };
  }

  function stateRoutes($stateProvider) {
    $stateProvider
      .state('expression', {
        url: '/expression',
        views: {
          'form@': {
            templateUrl: 'app/form/form.html',
            controller: 'FormCtrl as vm',
            resolve: {
              formFields: function (expressionFormFields) {
                return expressionFormFields.fields;
              },
              contents: function (expressionFormFields) {
                return expressionFormFields.contents;
              },
              formData: function (expressionFormFields) {
                return expressionFormFields.formData;
              }
            }
          }
        }
      });
  }

}());