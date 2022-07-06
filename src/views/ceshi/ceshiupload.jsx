import { defineComponent } from 'vue'

const childTem = defineComponent({
  props: {
    modelValue: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  setup(props) {
    const loadImg = () => {
      const arr = props.modelValue?.map((i) => {
        return { name: '', url: i }
      })
      console.log(arr);
      return arr
    }
    const fileList = loadImg()
    const render = () => {
      return (
        <el-upload
          v-model:file-list={fileList}
          action="https://lmg.jj20.com/up/allimg"
          list-type="picture-card"
        >
          <el-icon>
            <Plus />
          </el-icon>
        </el-upload>
      )
    }
    return render
  },
})

export default defineComponent({
  setup(props, { emit }) {
    const tableData = [
      {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
        fileList: [
          'https://lmg.jj20.com/up/allimg/tp09/210F2130512J47-0-lp.jpg',
        ],
      },
      {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
        fileList: [
          'https://lmg.jj20.com/up/allimg/4k/s/02/2109242306111155-0-lp.jpg',
        ],
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
        fileList: [],
      },
      {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
        fileList: [],
      },
    ]
    const render = () => {
      return (
        <div>
          <el-table data={tableData} style={{ width: '100%' }}>
            <el-table-column prop="date" label="Date" width="180" />
            <el-table-column prop="name" label="Name" width="180" />
            <el-table-column prop="address" label="Address" />
            <el-table-column prop="fileList" label="图片" width="180">
              {{
                default: (scope) => {
                  return <childTem v-model={scope.row.fileList} />
                },
              }}
            </el-table-column>
          </el-table>
        </div>
      )
    }

    return render
  },
})
