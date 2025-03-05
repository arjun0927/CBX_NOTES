import { useWindowDimensions } from 'react-native';
import React from 'react';
import RenderHTML from 'react-native-render-html';
import { parseDocument } from 'htmlparser2';

/**
 * ✅ Function: Delta format ko HTML me convert kare
 */
function deltaToHtml(delta) {
    if (!delta || !delta.ops) return '';

    return delta.ops.map(op => {
        let text = op.insert || '';
        let attr = op.attributes || {};

        if (attr.bold) text = `<strong>${text}</strong>`;
        if (attr.italic) text = `<em>${text}</em>`;
        if (attr.underline) text = `<u>${text}</u>`;
        if (attr.strike) text = `<s>${text}</s>`;
        if (attr.color) text = `<span style="color: ${attr.color}">${text}</span>`;
        if (attr.background) text = `<span style="background-color: ${attr.background}">${text}</span>`;
        if (attr.link) text = `<a href="${attr.link}">${text}</a>`;

        return text;
    }).join(" ");
}

const ReactNativeHtml = ({ item }) => {
    const { width } = useWindowDimensions();
    // console.log("Item Value: ", item);

    const content = item ? String(item) : "No content available";
    const delta = htmlToDelta(content);

    // console.log("Delta Format: ", JSON.stringify(delta, null, 2));

    const text = deltaToHtml(delta);
    const source = { html: `<div>${text}</div>` };

    return (
        <RenderHTML 
            contentWidth={width} 
            source={source} 
        />
    );
};

export default ReactNativeHtml;

/**
 * ✅ Function: HTML ko Delta format me convert kare
 */
function htmlToDelta(htmlString) {
    const doc = parseDocument(htmlString);
    let ops = [];

    function traverse(node, parentAttributes = {}) {
        if (node.type === 'text') {
            let attributes = { ...parentAttributes };
            ops.push({ insert: node.data, attributes: Object.keys(attributes).length ? attributes : undefined });
        } else if (node.type === 'tag') {
            let attributes = { ...parentAttributes };

            switch (node.name) {
                case 'strong': case 'b': attributes.bold = true; break;
                case 'em': case 'i': attributes.italic = true; break;
                case 'u': attributes.underline = true; break;
                case 's': attributes.strike = true; break;
                case 'h1': attributes.header = 1; break;
                case 'h2': attributes.header = 2; break;
                case 'a': attributes.link = node.attribs?.href; break;
                case 'span': 
                    if (node.attribs?.style?.includes('color')) {
                        const colorMatch = node.attribs.style.match(/color:\s*([^;]+)/);
                        if (colorMatch) attributes.color = colorMatch[1].trim();
                    }
                    break;
                case 'font': 
                    if (node.attribs?.color) {
                        attributes.color = node.attribs.color; 
                    }
                    break;
                case 'blockquote': attributes.blockquote = true; break;
                case 'ul': attributes.list = 'bullet'; break;
                case 'ol': attributes.list = 'ordered'; break;
            }

            node.children?.forEach(child => traverse(child, attributes));
        }
    }

    doc.children.forEach(node => traverse(node));
    return { ops };
}

