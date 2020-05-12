import { Form } from './form.po';


describe('Form tests', () => {
  let page: Form;    beforeEach(() => {
      page = new Form();
      page.navigateTo();
  });


  it('Form submit', () => {
    page.getAddressTextbox().sendKeys('Av Silva Paes');
    page.getNameTextbox().sendKeys('Jonas Silva');
    page.getCPFTextbox().sendKeys('778.080.079-27');
    page.getBirthdayextbox().sendKeys('12/03/1987');
    page.getCellphoneTextbox().sendKeys('(53) 99977-5647');

    page.getVehiclesTextbox().sendKeys('Carro');
    page.getModelsTextbox().sendKeys('BMW');
    page.getBrandsTextbox().sendKeys('320i');


    expect(page.campoName.getAttribute('value')).toEqual('Jonas Silva');
    expect(page.campoAddress.getAttribute('value')).toEqual('Av Silva Paes');
    expect(page.campoBirthday.getAttribute('value')).toEqual('12/03/1987');
    expect(page.campoCpf.getAttribute('value')).toEqual('778.080.079-27');
    expect(page.campoCellphone.getAttribute('value')).toEqual('(53) 99977-5647');


    expect(page.campoBrands.getAttribute('value')).toEqual('120');
    expect(page.campoModels.getAttribute('value')).toEqual('');
    expect(page.campoVehicles.getAttribute('value')).toEqual('carros');
   });
});
