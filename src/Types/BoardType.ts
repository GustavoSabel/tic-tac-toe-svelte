import type { Player, PlayerNone } from "./PlayerType"

type BoardPlace = Player | PlayerNone
export type BoardType = [
  [ BoardPlace, BoardPlace, BoardPlace ],
  [ BoardPlace, BoardPlace, BoardPlace ],
  [ BoardPlace, BoardPlace, BoardPlace ],
]