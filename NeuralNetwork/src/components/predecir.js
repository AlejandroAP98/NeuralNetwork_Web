import './browser.mjs'

export default function Run(net, inputs) {
    const output = net.run(inputs);
    return output;
}
