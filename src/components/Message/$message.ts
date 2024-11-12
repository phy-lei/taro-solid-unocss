
import { createSignal } from 'solid-js'
import { createElement, insert } from '@tarojs/plugin-framework-solid/dist/reconciler'
import { render } from "solid-js/web/dist/web.cjs"
import Message from "./Message"
import { ROOT_ID } from '@/utils/constants'

type MessageType = 'info' | 'success' | 'error' | 'warning'

interface Props {
  tips: string;
  type?: MessageType;
  duration?: number
}

const ANIMATION_TIME = 400
const [show, setShow] = createSignal(false);
const [Text, setText] = createSignal('');
const [variance, setVariance] = createSignal<MessageType>('info')

export default ({ tips, type = 'info', duration = 3000 }: Props) => {
  setVariance(type)
  setText(tips)
  if (show()) {
    return
  }
  setShow(true)
  const root = document.getElementById(ROOT_ID)
  if (!root) return
  const container = createElement('View')
  insert(root, container)
  const dispose = render(() => Message({ show, tips: Text, type: variance }), container)

  const destroy = () => {
    setTimeout(() => {
      setShow(false)
      setTimeout(() => {
        dispose()
        root.removeChild(container)
      }, ANIMATION_TIME)
    }, duration)
  }

  destroy()
}
