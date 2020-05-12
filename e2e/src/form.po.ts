import { browser, by, element } from 'protractor';

export class Form {

  campoName = element(by.name('name'));
  campoCpf = element(by.name('cpf'));
  campoCellphone = element(by.id('cellphone'));
  campoBirthday = element(by.id('birthday'));
  campoAddress = element(by.id('address'));
  campoVehicles = element(by.id('vehicles'));
  campoBrands = element(by.id('brands'));
  campoModels = element(by.id('models'));

  navigateTo() {
    return browser.get('/form') as Promise<any>;
  }

  getNameTextbox() {
    return element(by.name('name'));
  }

  getCPFTextbox() {
    return element(by.name('cpf'));
  }
  getCellphoneTextbox() {
    return element(by.name('cellphone'));
  }

  getBirthdayextbox() {
    return element(by.name('birthdate'));
  }
  getAddressTextbox() {
    return element(by.name('address'));
  }

  getVehiclesTextbox() {
    return element(by.name('type'));
  }
  getBrandsTextbox() {
    return element(by.name('brand'));
  }

  getModelsTextbox() {
    return element(by.name('model'));
  }
}
