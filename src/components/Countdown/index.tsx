import React, { PureComponent } from 'react'

import { isFunction } from '../_untils'

type CountdownRenderProps = {
    content: number | string
    running: boolean
}

type CountdownProps = Partial<{
    initialRemaining: number
    interval: number
    initialContent: string
    children(props: CountdownRenderProps): JSX.Element
}>

type CountdownState = Readonly<CountdownRenderProps>

class Countdown extends PureComponent<CountdownProps, CountdownState> {
    static defaultProps: CountdownProps = {
        initialRemaining: 60,
        interval: 1000,
        initialContent: '验证码'
    }

    private timer: NodeJS.Timer

    private i = this.props.initialRemaining

    readonly state: CountdownState = {
        running: false,
        content: this.props.initialContent!
    }

    componentWillUnmount() {
        clearTimeout(this.timer)
    }

    public start = (): void => {
        this.i!--
        this.setState({ content: this.i!, running: true })
        this.timer = setTimeout(() => {
            if (this.i! <= 1) {
                this.reset()
                return
            }
            this.start()
        }, this.props.interval!)
    }

    public reset = (): void => {
        clearTimeout(this.timer)
        this.i = this.props.initialRemaining
        this.setState({ content: this.props.initialContent!, running: false })
    }

    render() {
        const { content, running } = this.state
        return isFunction(this.props.children) ? this.props.children!({ content, running }) : null
    }
}

export default Countdown
