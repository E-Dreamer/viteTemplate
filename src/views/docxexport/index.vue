<!--
 * @Author: E-Dreamer
 * @Date: 2021-11-05 13:33:02
 * @LastEditTime: 2021-11-05 13:50:09
 * @LastEditors: E-Dreamer
 * @Description: 
-->
<template>
  <div>
    <el-button @click="print">导出</el-button>
  </div>
</template>

<script>
import Docxtemplater from 'docxtemplater'
import PizZip from 'pizzip'
import JSZipUtils from 'jszip-utils'
import { saveAs } from 'file-saver'
export default {
  setup () {
    const print = () => {
      const docName = '文档.docx'

      JSZipUtils.getBinaryContent('expense.docx', function (error, content) {
        if (error) {
          throw error
        }

        // 创建一个JSZip实例，内容为模板的内容
        let zip = new PizZip(content)
        // 创建并加载docxtemplater实例对象
        let doc = new Docxtemplater().loadZip(zip)
        doc.setData({
          isCommon: true,
          date: '2021-11-05',
          applicant: '王大锤',
          dpt: '技术部',
          applicantNo: '001',
          dptNo: 'Top1',
          table: [
            {
              index: 1,
              expense_name: '交通费',
              expense_date: '2021-11-01',
              receipt_num: 3,
              amount: 100,
            }
          ],
          amtUpper: '壹佰元',
          j: 0,
          i: 0,
          h: 0,
          g: 0,
          f: 0,
          e: 1,
          d: 0,
          c: 0,
          b: 0,
          a: 0
        })

        try {
          doc.render()
        } catch (error) {
          console.log(error)
          // 抛出异常
          let e = {
            message: error.message,
            name: error.name,
            stack: error.stack,
            properties: error.properties
          };
          console.log(JSON.stringify({ error: e }));
          throw error;
        }
        // 生成一个代表docxtemplater对象的zip文件（不是一个真实的文件，而是在内存中的表示）
        var out = doc.getZip().generate({
          type: "blob",
          mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        });
        // 将目标文件对象保存为目标类型的文件，并命名
        saveAs(out, docName);
      })
    }
    return {
      print,
    }
  },
}
</script>
