module Main exposing (LoadingStatus(..), Model, Msg(..), init, main, subscriptions, update, view)

import Browser
import Html exposing (Html, button, div, input, pre, text)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput)
import Http
import Json.Encode exposing (object, string)



-- MAIN


main =
    Browser.element
        { init = init
        , update = update
        , subscriptions = subscriptions
        , view = view
        }



-- MODEL


type LoadingStatus
    = Init
    | Failure
    | Loading
    | Success String


type alias Model =
    { status : LoadingStatus
    , name : String
    }


init : () -> ( Model, Cmd Msg )
init _ =
    ( { status = Init, name = "" }
    , Cmd.none
    )


enterToRoom : () -> Cmd Msg
enterToRoom _ =
    Http.get
        { url = "http://localhost:3000/room/0"
        , expect = Http.expectString GotText
        }


createRoom : String -> Cmd Msg
createRoom name =
    Http.post
        { url = "http://localhost:3000/room/create"
        , body = Http.jsonBody (object [ ( "name", string name ) ])
        , expect = Http.expectString GotText
        }



-- UPDATE


type Msg
    = GotText (Result Http.Error String)
    | HandleChangeNameInput String
    | SubmitCreateRoom


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        GotText result ->
            case result of
                Ok fullText ->
                    ( { model | status = Success fullText }, Cmd.none )

                Err _ ->
                    ( { model | status = Failure }, Cmd.none )

        HandleChangeNameInput input ->
            ( { model | name = input }, Cmd.none )

        SubmitCreateRoom ->
            ( model, createRoom model.name )



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none



-- VIEW


view : Model -> Html Msg
view model =
    case model.status of
        Init ->
            div [ class "penis" ]
                [ Html.form []
                    [ input [ placeholder "Enter the name", onInput HandleChangeNameInput ] []
                    , button [ onClick SubmitCreateRoom, type_ "button" ] [ text "Create Room" ]
                    ]
                ]

        Failure ->
            text "I was unable to load your book."

        Loading ->
            text "Loading..."

        Success fullText ->
            pre [] [ text fullText ]
