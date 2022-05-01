var button = document.querySelector('.calculate_button');


button.addEventListener('click', function () {
	let n = parseInt((document.querySelector('.input_n')).value);
	let function_vector = Array.from(document.querySelector('.function_vector').value.substring(0, Math.pow(2, n)));

	// console.log(function_vector)

	let PZH = document.querySelector('.f_table');
	PZH.innerHTML = '';
	let x_arr = createTable(PZH, n + 1, Math.pow(2, n) + 1, function_vector);

	buildPZH(PZH, x_arr, n);




	MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'wrapper']);
})



function getNextXorArr(xor_arr) {
	for (let i = 0; i < xor_arr.length - 1; i++) {
		xor_arr[i] = Number(xor_arr[i] != xor_arr[i + 1]);
	}
	xor_arr.length--;
}

function getXNumberFromBinary(str_binary) {
	let result = '';

	for (let i = 0; i < str_binary.length; i++) {
		if (str_binary[i] == '1') {
			result += i + 1;
		}
	}

	if (result) {
		return result;
	}
	return '0';
}

function getXfromNumber(number) {
	if (number != '0') {
		let result = '';
	
		for (let i = 0; i < number.length; i++) {
			result += `x_${number[i]}`;
		}

		return result;
	}

	return '1';
}


function buildPZH(parent, x_arr, varCount) {
	parent.innerHTML += `\\[f(\\tilde{x}^{_${varCount}}) = `;

	parent.innerHTML += x_arr[0];

	for (let i = 1; i < x_arr.length; i++) {
		parent.innerHTML += ` \\oplus ${x_arr[i]}`;
	}

	parent.innerHTML += '\\]';
}


function buildElementaryConjunction(varCount, num_x_arr) {
	let result ='';
	
	for (let i = 0; i < num_x_arr.length; i++) {
		result += `x${num_x_arr[i]} `;
	}

	return result;
}

function fillBeginWithZero(str, neededLength) {
	let tmp_str = '';

	for (let i = 0; i < neededLength - str.length; i++) {
		tmp_str += '0';
	}

	return (tmp_str + str);
}


function printAray(arr) {
	arr_str = '';

	for (let i = 0; i < arr.length; i++) {
		arr_str += arr[i] + '&nbsp&nbsp';
	}

	return arr_str;
}


function createTable(parent, cols, rows, function_vector) {
	let table = document.createElement('table');

	let x_arr = [];
	let xor_arr = function_vector.slice(0);

	let tr = document.createElement('tr');
	for (let i = 0; i < cols - 1; i++) {
		let td = document.createElement('td');
		td.innerHTML = `\\[x_${i + 1}\\]`;
		tr.appendChild(td);
	}

	let td = document.createElement('td');
	td.innerHTML = `\\[f(\\tilde{x}^{_${cols - 1}})\\]`
	tr.appendChild(td);

	td = document.createElement('td');
	td.innerHTML = 'Двійковий трикутник';
	tr.appendChild(td);

	td = document.createElement('td');
	td.innerHTML = 'коефіцієнти поліному';
	tr.appendChild(td);

	table.appendChild(tr);


	for (let i = 0; i < rows - 1; i++) {
		let tr = document.createElement('tr');

		let str_binary = fillBeginWithZero(i.toString(2), cols - 1);

		for (let j = 0; j < cols - 1; j++) {
			let td = document.createElement('td');
			td.innerHTML = str_binary[j];
			tr.appendChild(td);
		}

		let td = document.createElement('td');
		td.innerHTML = function_vector[i];
		tr.appendChild(td);

		td = document.createElement('td');
		td.innerHTML = printAray(xor_arr);
		tr.appendChild(td);
		
		td = document.createElement('td');
		td.innerHTML = `\\[a_{${getXNumberFromBinary(str_binary)}} = ${xor_arr[0]}\\]`;
		tr.appendChild(td);

		if (xor_arr[0] == '1') {
			x_arr.push(getXfromNumber(getXNumberFromBinary(str_binary)));
		}

		getNextXorArr(xor_arr);

		table.appendChild(tr);
	}

	
	parent.appendChild(table);



	// console.log(x_arr);
	return x_arr;


}





		// function printGlobalDNF(varCount) {
		// 	let result = '\\[';
		
		// 	for (let x_count = 1; x_count <= varCount; x_count++) {
		// 		for (let j = 0; j < Combination(x_count, varCount); j++) {
		// 			for (let k = 0; k < Math.pow(2, x_count); k++) {
		// 			}
		// 		}
		// 	}
		// }
		

button.click();