import './index.scss';
import tpl from './index.tpl';

export default () => {
	return {
		name: 'header',
		showRemove: false,
		
		tpl (title, isShow,deleteFlag) { //template
			let oHeader = document.createElement('div'),
				oRemoveCell = Array.from(document.getElementsByClassName('remove-cell'));
			oHeader.className = 'header';
			oHeader.innerHTML = tpl().replace(/{{(.*?)}}/g, (node, key) => {
				return {
          title, 
					is_show: isShow ? 'show' : '',
					delete: oRemoveCell.length? deleteFlag  :'关闭',
				}[key];
			});
		  return oHeader;
		},

		onEditBtn () {
      this.showRemove = !this.showRemove;

		const  oRemoveCell = Array.from(document.getElementsByClassName('remove-cell')),
					 oEditBtn = document.getElementsByClassName('J_editItem')[0];
			if(oRemoveCell.length >0){
				oRemoveCell.forEach((elem) => {
					console.log('adasdasdsad');
					console.log(this.showRemove);
					if (this.showRemove) {
						oEditBtn.innerHTML = '关闭';
						elem.className += ' show';
					} else {
						oEditBtn.innerHTML = '编辑';
						elem.className = 'cell remove-cell';
					}
				});
			}
			else{
				oEditBtn.innerHTML = '关闭';
				window.location = 'index.html';
			}
		}
    
	}
}