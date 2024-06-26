<template>
  <div class="vm-codemirror">
    <textarea ref="cm" style="min-height: 100px; max-height: 500px" />
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, onUnmounted, watch, markRaw } from 'vue'
  import CodeMirror from 'codemirror'
  // css
  import 'codemirror/lib/codemirror.css'

  import 'codemirror/theme/idea.css'

  import 'codemirror/addon/lint/lint'
  import 'codemirror/addon/lint/lint.css'
  import 'codemirror/addon/lint/json-lint'
  // modes
  import 'codemirror/mode/javascript/javascript'
  // addon
  import 'codemirror/addon/comment/comment'
  import 'codemirror/addon/fold/brace-fold'
  import 'codemirror/addon/fold/indent-fold'
  import 'codemirror/addon/fold/comment-fold'

  const props = defineProps<{
    modelValue: string
    readonly: boolean
    mode: string
  }>()
  const emits = defineEmits<{
    (e: 'update:modelValue', modelValue: string): void
    (e: 'change', value: string): void
  }>()

  let editor: CodeMirror.Editor | null
  const cm = ref()

  watch(
    () => props.modelValue,
    () => {
      if (null != editor && props.modelValue && props.modelValue !== editor.getValue()) {
        // 触发v-model的双向绑定
        editor.setValue(props.modelValue)
      }
    }
  )

  const init = () => {
    editor = markRaw(
      CodeMirror.fromTextArea(cm.value, {
        value: '{}',
        mode: props.mode,
        readOnly: props.readonly,
        theme: 'idea',
        lint: false,
        tabSize: 2,
        lineNumbers: true,
        smartIndent: true, // 是否智能缩进
        lineWrapping: true, // 自动换行
        scrollbarStyle: 'null',
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers']
      })
    )
    editor.setValue(props.modelValue)
    editor.on('change', () => {
      emits('update:modelValue', (editor as CodeMirror.Editor).getValue())
      emits('change', (editor as CodeMirror.Editor).getValue())
    })
    setTimeout(() => {
      editor?.refresh()
    }, 0)
  }

  onMounted(() => {
    init()
  })
  onUnmounted(() => {
    editor = null
  })
</script>

<style lang="scss">
  .vm-codemirror {
    height: 100%;
    position: relative;
    .CodeMirror {
      height: auto;
    }
    .CodeMirror-lines {
      text-align: left;
    }
    .CodeMirror-scroll {
      height: auto;
      min-height: 100px;
      max-height: 500px;
    }
  }
</style>
