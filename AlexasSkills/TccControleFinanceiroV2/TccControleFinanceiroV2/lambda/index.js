/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'O que você quer fazer?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const data = new Date();
const dia = String(data.getDate()).padStart(2, '0');
const mes = String(data.getMonth() + 1).padStart(2, '0');
const ano = data.getFullYear();
const dataAtual = dia + '/' + mes + '/' + ano;

const MediaDespesaIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'MediaDespesaIntent';
    },
    async handle(handlerInput) {

        const axios = require('axios');

        return await axios.get("https://api-googlesheets.herokuapp.com/getAverageDespesa")
            .then(function (response) {

                const mediaDespesa = parseFloat(response.data.values[0]).toFixed(2).toString().replace(".", ",");

                const speakOutput = `Sua media diaria de Despesa é R$${mediaDespesa}`;

                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    .getResponse();
            })
            .catch(function (error) {
                const speakOutput = `ouve um erro ${error}`;
                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
                    .getResponse();
            });
    }
};

const MediaReceitaIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'MediaReceitaIntent';
    },
    async handle(handlerInput) {

        const axios = require('axios');

        return await axios.get("https://api-googlesheets.herokuapp.com/getAverageReceita")
            .then(function (response) {

                const mediaReceita = parseFloat(response.data.values[0]).toFixed(2).toString().replace(".", ",");

                const speakOutput = `Sua media diaria de Receita é R$${mediaReceita}`;

                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    .getResponse();
            })
            .catch(function (error) {
                const speakOutput = `ouve um erro ${error}`;
                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
                    .getResponse();
            });
    }
};

const TotalDespesaIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'TotalDespesaIntent';
    },
    async handle(handlerInput) {

        const axios = require('axios');

        return await axios.get("https://api-googlesheets.herokuapp.com/getTotalDespesa")
            .then(function (response) {

                const totalDespesa = parseFloat(response.data.values[0]).toFixed(2).toString().replace(".", ",");

                const speakOutput = `Seu Total de Despesas é R$${totalDespesa}`;

                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    .getResponse();
            })
            .catch(function (error) {
                const speakOutput = `ouve um erro ${error}`;
                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
                    .getResponse();
            });
    }
};

const TotalReceitaIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'TotalReceitaIntent';
    },
    async handle(handlerInput) {

        const axios = require('axios');

        return await axios.get("https://api-googlesheets.herokuapp.com/getTotalReceita")
            .then(function (response) {

                const totalDespesa = parseFloat(response.data.values[0]).toFixed(2).toString().replace(".", ",");

                const speakOutput = `Seu Total de Receita é R$${totalDespesa}`;

                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    .getResponse();
            })
            .catch(function (error) {
                const speakOutput = `ouve um erro ${error}`;
                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
                    .getResponse();
            });
    }
};

const DespesaIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'DespesaIntent';
    },
    handle(handlerInput) {

        const valor = handlerInput.requestEnvelope.request.intent.slots.valor.value;

        const valorFormated = parseFloat(valor).toFixed(2).toString().replace(".", ",");

        const axios = require('axios');

        return axios.post(`https://api-googlesheets.herokuapp.com/addDespesa`, {
            "values": [
                [`${dataAtual}`, `${valorFormated}`]
            ]
        }).then(function (response) {
            const speakOutput = `A despesa no valor de R$${valor} foi adicionada na data de hoje`;

            return handlerInput.responseBuilder
                .speak(speakOutput)
                //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
                .getResponse();
        })
            .catch(function (error) {
                const speakOutput = `ouve um erro`;
                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
                    .getResponse();
            });
    }
};

const ReceitaIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ReceitaIntent';
    },
    ahandle(handlerInput) {
        const valor = handlerInput.requestEnvelope.request.intent.slots.valor.value;

        const valorFormated = parseFloat(valor).toFixed(2).toString().replace(".", ",");

        const axios = require('axios');

        return axios.post(`https://api-googlesheets.herokuapp.com/addReceita`, {
            "values": [
                [`${dataAtual}`, `${valorFormated}`]
            ]
        }).then(function (response) {
            const speakOutput = `A receita no valor de R$${valor} foi adicionada na data de hoje`;

            return handlerInput.responseBuilder
                .speak(speakOutput)
                //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
                .getResponse();
        })
            .catch(function (error) {
                const speakOutput = `ouve um erro`;
                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
                    .getResponse();
            });
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        MediaDespesaIntentHandler,
        MediaReceitaIntentHandler,
        TotalDespesaIntentHandler,
        TotalReceitaIntentHandler,
        DespesaIntentHandler,
        ReceitaIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();