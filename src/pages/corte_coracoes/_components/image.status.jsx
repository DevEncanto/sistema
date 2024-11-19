export const ImageStatusFeedback = (props) => {

    const { type = "error" } = props
    return (
        <>
            {type === "error" ? <img src="/assets/animations/error_animation.gif" width={100} height={100} /> : <></>}
            {type === "success" ? <img src="/assets/animations/success_animation.gif" width={250} height={250} /> : <></>}
            {type === "warning" ? <img src="/assets/animations/warning_animation.gif" width={180} height={180} /> : <></>}
        </>
    )

}