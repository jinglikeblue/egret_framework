enum ES2C {
    NOTICE = 1,
    PING,
    PLAYER_INFO,

    UPDATE_GOLD = 1000,
    UPDATE_ROOM_INFO,

    ENTER_ROOM = 2100,
    TURN_TO_PLAYER,
    PLAYER_DO_ACTION,
    UPDATE_GAME,
    GAME_RESULT,
    PLAYER_SIT_DOWN,
    PLAYER_STAND_UP,
    PLAYER_LEAVE_ROOM,
    PLAYER_DISS_ROOM,
    CHAT_NOTICE_MSG,
    SHOW_CARD_SELF,
    SHOW_CARD_OTHER,
    UPDATE_ROOM_INFO_SINGLE,
    BRING_IN_CHIP,
    INSURANCE_MSG,
    BUY_INSURANCE,
    CANCEL_INSURANCE,
    INSURANCE_RESULT,
    ONE_GAME_RECORD,
    PERSON_ROOM_RECORDS,
    PERSON_GAME_RECORDS,
    MY_CREATED_ROOMS,
    JACKPOT_BUY_RESULT,
    JACKPOT_RESULT,
    JACKPOT_DATA,
    UPDATE_MY_INS_POOL = 2126,
    UPDATE_MY_INS_POOL_DETAIL,
    MODIFY_ROOM_DATA,
    // PLAYER_HOLD_SEAT = 2200,
    PLAYER_UNHOLD_SEAT = 2201,
    RESPONSE_ADVERTISE = 2300,
    RESPONSE_NOTICE
}