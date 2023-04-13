import type { Player, PlayerNone } from "./PlayerType"

type BoardPlace = Player | PlayerNone

export type BoardFields = [
  [BoardPlace, BoardPlace, BoardPlace],
  [BoardPlace, BoardPlace, BoardPlace],
  [BoardPlace, BoardPlace, BoardPlace],
]