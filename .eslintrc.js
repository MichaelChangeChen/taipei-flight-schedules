module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
	'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
	'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
	'vue/order-in-components': 'error', // 控制组件内属性方法的顺序：比如mehtods需要放在computed后面
	'vue/no-potential-component-option-typo': ['error', { // 组件内的属性名打错了会报错: 比如: methods尾部少打了s: method:{} ,就会报错
	presets: ['all'],
	// custom: ['test'] // 此处可以添加自定义的属性, 可以避免eslint对属性名报错
	}],
	'vue/no-unused-properties': ['error', { // 声明了, 但没使用的vue内的属性名, 会报错
	groups: [
		'props',
		'data',
		'computed',
		'methods',
		'setup'
	]
	}],
	'vue/padding-line-between-blocks': 'error', // <template><script><style> 块之间, 需要有空行
 
	'object-property-newline': 1, // 支持一行写多个key-value
	'dot-notation': 1, // 支持 obj['aa'] = 1 的写法,可以作为是否有'aa'属性的区分, 如果原本就有aa属性, 则直接 obj.aa = 1
	'no-duplicate-imports': 'error', // 禁止重复import导入
	'accessor-pairs': 'error', // 强制getter/setter成对出现在对象中
	'no-var': 'error', // no var
	'no-loop-func': 'error' // 循环中存在执行函数，不能用var
  }
 }
 
//  -   `"off"`或`0`- 关闭规则
//  -   `"warn"`或`1`- 开启规则，使用警告级别的错误：`warn`(不会导致程序退出)
//  -   `"error"`或`2`- 开启规则，使用错误级别的错误：`error`(当被触发的时候，程序会退出)
