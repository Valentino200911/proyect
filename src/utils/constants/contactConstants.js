// model

        export const REASON_OF_CONTACT = Object.freeze({

            BUSINESS: "business",
            PROM: "prom",
            PROBLEM: "problem",
            SUGGESTION: "suggestion"

        });

// servuce

        export const POPULATE_CONTACT = [

            {
                path: "user",
                select: "name surname phoneNumber email"
            },
        ]