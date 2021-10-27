# 表单设计器

### 封装说明

该组件是基于element-plus 表单组件及各种基础控件封装

目的是为了解决简单重复性的表单反复书写问题 



## 配置说明

##### formList字段说明 type:Array

|            |                                   |        |        |
| ---------- | --------------------------------- | ------ | ------ |
| 字段       | 说明                              | 类型   | 默认值 |
| label      | label说明                         | String | ‘’“    |
| key        | 表单内的控件的v-model字段         | String | ”“     |
| labelWidth | form-model-item label-width的宽度 | String | 100px  |
| type       | 控件类型(input,radio,select)      | String | ''     |
| colSpan    | col :span 的值                    | Number | 12     |
| plac       | *placeholder* 说明                | String | ”“     |

##### form：表单的model type为object 就是formlist内的所有key

## 支持控件

##### input

element的input组件 包括文本输入，密码输入，数字输入，文本域输入

subType支持textarea,number,default,password

##### 基本使用

```
{
 label:'文本',
 key:'text',
 type:"input"
 subType:'password',
 plac:'请输入文本',
 disabled: true | false,
 colSpan：12 （ 0-24）
}
```

**特殊参数说明：**

| 字段     | 说明              | 类型    | 默认值    |
| -------- | ----------------- | ------- | --------- |
| subType  | 子类型            | String  | 'default' |
| max      | number类型 最大值 | Number  | 0         |
| min      | number类型 最小值 | Number  | 10000     |
| rows     | textarea类型 行高 | Number  | 2         |
| disabled | 是否禁用          | Boolean |           |

##### select

element select 组件 

##### 基本使用

```
{
	label:'',
	key:"",
	type:"select",
	plac:"请选择",
	disabled: true | false,
	colSpan：12 （ 0-24）
}
```

**特殊参数说明：**

| 字段     | 说明                        | 类型     | 默认值 |
| -------- | --------------------------- | -------- | ------ |
| group    | 分组(查看element的分组配置) | Array    | []     |
| multiple | 是否多选                    | Boolean  | false  |
| loading  | 下拉框loading               | Boolean  | false  |
| filter   | select官网  *filter-method* | Function | null   |
| remote   | select官网 **remote-method* | Function | null   |
| options  | 下拉数据                    | Array    | []     |

##### radio

element radio 组件 

##### 基本使用

```
{
	label:'',
	key:"",
	type:"radio",
	plac:"请选择",
	disabled: true | false,
	colSpan：12 （ 0-24），
	options:[]
}
```

##### switch

element switch组件 

##### 基本使用

```
{
	label:'',
	key:"",
	type:"switch",
	disabled: true | false,
	colSpan：12 （ 0-24），
	loading:true | false,
	activeColor:'#fff',//选中颜色
	inactiveColor:'#000',//未选中颜色
	active: Number | Boolean | String, //switch 打开时的值
	inactive Number | Boolean | String,//switch 打开时的值
	border: Boolean 是否显示边框
}
```

##### checkbox

element checkbox组件 

##### 基本使用

```
{
	label:'',
	key:"",
	type:"switch",
	colSpan：12 （ 0-24），
	options:[]
}
```

