const promiseSuspender = (wrappedPromise) => {
    let status = "pending";
    let result = null;

    const suspender = wrappedPromise
        .then((resolvedResult) => {
            status = "success";
            result = resolvedResult;
        })
        .catch((error) => {
            status = "error";
            result = error;
        });

    return {
        read() {
            switch (status) {
                case "pending":
                    throw suspender;
                case "error":
                    return result;
                default:
                    return result;
            }
        },
    };
};

const suspender = (promise) => {
    return {
        data: promiseSuspender(promise),
    };
};

export default suspender;