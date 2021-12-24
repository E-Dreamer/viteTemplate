<!--
 * @Author: E-Dreamer
 * @Date: 2021-11-05 13:33:02
 * @LastEditTime: 2021-12-24 14:23:12
 * @LastEditors: E-Dreamer
 * @Description: 
-->
<template>
  <div>
    <el-button @click="print" class="button">导出</el-button>
    <el-timeline ref="timeLine" id="timeLine">
      <el-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        :type="activity.type"
        :timestamp="activity.timestamp"
      >{{ activity.content }}</el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import Docxtemplater from 'docxtemplater'
import PizZip from 'pizzip'
import JSZipUtils from 'jszip-utils'
import { saveAs } from 'file-saver'
import { reactive, toRefs, ref } from 'vue'
import html2canvas from 'html2canvas'
import ImageModule from 'docxtemplater-image-module'
export default {
  setup () {
    const state = reactive({
      activities: [
        {
          content: '王大锤 审批通过',
          type: 'success',
          timestamp: '2018-04-15',
        },
        {
          content: 'Approved',
          type: 'primary',
          timestamp: '2018-04-13',
        },
        {
          content: 'Success',
          type: 'warning',
          timestamp: '2018-04-11',
        },
      ],

    })
    const timeLine = ref(null)
    const print = () => {
      const docName = '文档.docx'
      // var ImageModule = require('open-docxtemplater-image-module');

      JSZipUtils.getBinaryContent('expense.docx', async function (error, content) {
        if (error) {
          throw error
        }
        //图片解析
        const base64Regex =
          /^data:image\/(png|jpg|svg|svg\+xml);base64,/;
        function base64Parser (dataURL) {
          if (
            typeof dataURL !== "string" ||
            !base64Regex.test(dataURL)
          ) {
            return false;
          }
          const stringBase64 = dataURL.replace(base64Regex, "");
          console.log(stringBase64)
          // For nodejs
          if (typeof Buffer !== "undefined" && Buffer.from) {
            return Buffer.from(stringBase64, "base64");
          }

          // For browsers :
          const binaryString = window.atob(stringBase64);
          const len = binaryString.length;
          const bytes = new Uint8Array(len);
          for (let i = 0; i < len; i++) {
            const ascii = binaryString.charCodeAt(i);
            bytes[i] = ascii;
          }
          return bytes.buffer;
        }

        //将流程dom转成图片插入到word中
        const id = document.getElementById('timeLine')
        const canvas = await html2canvas(id)
        let imgurl = canvas.toDataURL()

        var opts = {
          fileType: "docx",
          centered: false,
          getImage: function (tagValue, tagName) {
            return base64Parser(tagValue)
          },
          getSize: function (img, tagValue, tagName) {
            // FOR FIXED SIZE IMAGE :
            return [canvas.width,canvas.height];//图片大小 （这个可以写成动态的，开发文档上有）
          }
        }
        let imageModule = new ImageModule(opts);

        // 创建一个JSZip实例，内容为模板的内容
        let zip = new PizZip(content)
        // 创建并加载docxtemplater实例对象
        const doc = new Docxtemplater().attachModule(imageModule)
          .loadZip(zip)
        // const doc = new Docxtemplater(zip,{modules: [new ImageModule(imageOpts)]})

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
          a: 0,
          flowChart: imgurl
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
      ...toRefs(state),
      timeLine
    }
  }
}
</script>
