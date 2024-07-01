import { PageInfo } from '@/store/model.pageinfo'
import { TokenRecord_Nativeblockchain } from '@/store/model.tokenrecord'

export interface TokenRecordsState {
    edges: TokenRecord_Nativeblockchain[]
    linkedtokenrecords:TokenRecord_Nativeblockchain[] 
    tokenrecord: TokenRecord_Nativeblockchain
    pageInfo: PageInfo
  }