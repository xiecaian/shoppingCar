import './index.scss';
import tpl from './index.tpl';
import { ShoppingCarModel } from '../../../modues/shopping';
import CheckBox from '../check_box/index';
import NumSelector from '../num_selector/index';
import Toast from '../../toast/index';

const shoppingCarModel = new ShoppingCarModel(),
      checkBox =  CheckBox(),
      numSelector =  NumSelector(),
      toast =  Toast();

export default () => {
  return {
  	name: 'listItem',
  	makeList (data) {
      let list = '';

      data.forEach ((elem, idx) => {
        elem.checked = true;
        list += tpl().replace(/{{(.*?)}}/g, (node, key) => {
          return {
            img_url: elem.img_url,
            goods_name: elem.goods_name,
            price: elem.price,
            check_box: checkBox.tpl(elem.id, 'subCheck', idx),
            num_selector: numSelector.tpl(elem.num, elem.id, elem.limitation, idx),
            id: elem.id,
            index: idx
          }[key];
        });
      });

      return list;
  	},

  	listEvent (e) {
  		const tar = e.target,
  		      className = tar.className;
      console.log('bindOKKKKKK');
      return new Promise ((resolve, reject) => {
	  		if (className === 'item btn') {
	  			const field = tar.dataset.field,
                oParent = tar.parentNode,
	  			      id = oParent.dataset.id,
                idx = oParent.dataset.index,
	  			      limitation = tar.dataset.limitation,
	  			      oInput = document.getElementById('J_numInput_' + id);

	  			switch (field) {
	  				case 'add':
              console.log(parseInt(oInput.value) );
              console.log(limitation );
              if (parseInt(oInput.value) < limitation) {
                oInput.value = parseInt(oInput.value) + 1;
                shoppingCarModel.updateCartNum(id, oInput.value);
                resolve({field: 'numSelector', num: oInput.value, idx});
              } else {  
              	resolve(-1);
              }

	  				  break;
            case 'minus':
            console.log(parseInt(oInput.value) );
	  				  if (parseInt(oInput.value) > 1) {
                oInput.value = parseInt(oInput.value) - 1;
                shoppingCarModel.updateCartNum(id, oInput.value);
                resolve({field: 'numSelector', num: oInput.value, idx});
              } else {  
              	resolve(-1);
              }

	  				  break;
	  				default:
	  				  break;
	  			}
	  			
        }else if (className === 'check-input J_mainCheck') {
	  			const oSubChecks = Array.from(document.getElementsByClassName('J_subCheck')),
                oMainCheck = document.getElementsByClassName('J_mainCheck')[0];
                oMainCheck.checked = true;
            const checked = oMainCheck.checked;
            oSubChecks.forEach((elem) => {
              console.log(elem);
                   elem.checked = true;
                   console.log(elem.checked);
          });
          
          //resolve({field: 'checkBox',idx:oSubChecks.length, checked});
          resolve({field: 'allCheckBox',idx:oSubChecks.length, checked});
	  		}
         else if (className === 'check-input J_subCheck') {
	  			const oSubChecks = Array.from(document.getElementsByClassName('J_subCheck')),
                oMainCheck = document.getElementsByClassName('J_mainCheck')[0];
                console.log(oMainCheck);
                console.log(oSubChecks);
           const     oParent = tar.parentNode,
                idx = oParent.dataset.index,
                checked = oSubChecks[idx].checked;
          
          oMainCheck.checked = oSubChecks.every((elem) => {
            return elem.checked === true;
          });

          resolve({field: 'checkBox', idx, checked});
	  		} else if (className === 'fa fa-trash') {
          const id = tar.dataset.id,
                idx = tar.dataset.index,
                oItem = tar.parentNode.parentNode;

            shoppingCarModel.removeCartItem(id).then((res) => {
            const code = res.msg_code;

            if (code === '200') {
              toast.showToast({
                icon: 'success',
                title: '删除成功',
                duration: 1500
              });
              oItem.remove();
              resolve({field: 'remove', idx});
            } else {
              toast.showToast({
                icon: 'warning',
                title: '删除失败',
                duration: 1500
              });
            }
          });
        }
      });
  	}
  }
}





