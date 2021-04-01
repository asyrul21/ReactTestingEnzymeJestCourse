import checkPropTypes from "check-prop-types"

export const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test='${val}']`)
}

export const checkPropTypesFor = (component, conformingProps) => {
    const propError = checkPropTypes(
        component.propTypes, 
        conformingProps, 
        "prop", 
        component.name
    )
    expect(propError).toBeUndefined()
}

