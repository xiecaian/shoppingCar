import './index.scss';
import tpl from './index.tpl';
import CheckBox from '../check_box/index';

const checkBox = CheckBox();

export default () => {
	return {
		name: 'purchaseBox',
		tpl (price) {
			let html = tpl().replace(/{{(.*?)}}/g, (node, key) => {
        return {
        	price,
        	check_box: checkBox.tpl(0, 'mainCheck')
        }[key];    
			});

			let oBox = document.createElement('div');
			oBox.className = 'purchase-box';
			oBox.innerHTML = html;

			return oBox;
		}
	}
}