import React from 'react';
import { FormPanel, TextAreaField } from '@extjs/reactor/modern';

export default function TextAreaFieldExample() {
    return (
        <FormPanel shadow={true}>
            <TextAreaField 
                label="Description"
                maxRows={10}
            />
        </FormPanel>
    )
}