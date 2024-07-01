import { gql } from 'apollo-boost'

export  const Queries =  {
    tokenRecordSearch :  gql`
        fragment tokenDataListing on TokenRecord_Nativeblockchain {
            tokenId
            dltType
            dtiType
            fieldGroupName
            genesisBlockHash
            genesisBlockHashAlgorithm
            genesisBlockUtcTimestamp
            longName
            originalLanguageLongName
            originalLanguageShortName
            publicDistributedLedgerIndicator
            referenceImplementationUrl
            shortName
            unitMultiplier
            auxiliaryDigitalTokenDistributedLedger
            auxiliaryDigitalTokenMechanism
            auxiliaryDigitalTokenTechnicalReference
            digitalTokenExternalIdentifiers
            forks
            functionallyFungibleDtisList
            underlyingAssetExternalIdentifiers
            dtiStatus
        }

        fragment tokenPageData on WPPageInfo {
            hasNextPage
            hasPreviousPage
            endCursor
            startCursor
        }

        query GetTokenList
        ( 
        $after: String
        $before: String
        $first: Int
        $last: Int
        $tokenid: String
        $dtitype: String       
        $shortname: String
        $longname: String
        $auxiliarymechanism: String
        ) 
        {
        tokenRecords( 
            after: $after
            before: $before
            first: $first
            last: $last                    
            where: {
            metaQuery:{
                relation: OR
                metaArray:[
                { key: "token_id",   value: $tokenid,   compare: LIKE },
                { key: "dti_type",   value: $dtitype,   compare: EQUAL_TO },              
                { key: "short_name", value: $shortname, compare: LIKE },
                { key: "long_name",  value: $longname,  compare: LIKE },        
                { key: "auxiliary_digital_token_mechanism",  value: $auxiliarymechanism,  compare: LIKE }
                ]
            }
            }
        ) {
            edges {
            cursor
            node {
                slug
                id                            
                tags {
                nodes{
                    id
                    name
                    slug
                }
                }
                NativeBlockchain {
                    ...tokenDataListing 
                }             
            }     
            }
            
            pageInfo {
            ...tokenPageData
            }            
        }
    }
    `,
    tokenRecordSearchEqualTo :  gql`
        fragment tokenDataListing on TokenRecord_Nativeblockchain {
            tokenId
            dltType
            dtiType
            fieldGroupName
            genesisBlockHash
            genesisBlockHashAlgorithm
            genesisBlockUtcTimestamp
            longName
            originalLanguageLongName
            originalLanguageShortName
            publicDistributedLedgerIndicator
            referenceImplementationUrl
            shortName
            unitMultiplier
            auxiliaryDigitalTokenDistributedLedger
            auxiliaryDigitalTokenMechanism
            auxiliaryDigitalTokenTechnicalReference
            digitalTokenExternalIdentifiers
            forks
            functionallyFungibleDtisList
            underlyingAssetExternalIdentifiers
            dtiStatus
        }

        fragment tokenPageData on WPPageInfo {
            hasNextPage
            hasPreviousPage
            endCursor
            startCursor
        }

        query GetTokenList
        ( 
            $after: String
            $before: String
            $first: Int
            $last: Int
            $tokenid: String
            $dtitype: String       
            $shortname: String
            $longname: String
            $auxiliarymechanism: String
        ) 
        {
        tokenRecords( 
            after: $after
            before: $before
            first: $first
            last: $last                    
            where: {
            metaQuery:{
                relation: OR
                metaArray:[
                { key: "token_id",   value: $tokenid,   compare: LIKE },
                { key: "dti_type",   value: $dtitype,   compare: EQUAL_TO },              
                { key: "short_name", value: $shortname, compare: LIKE },
                { key: "long_name",  value: $longname,  compare: LIKE },
                { key: "auxiliary_digital_token_mechanism",  value: $auxiliarymechanism,  compare: LIKE }        
                ]
            }
            }
        ) {
            edges {
            cursor
            node {
                slug
                id                            
                tags {
                nodes{
                    id
                    name
                    slug
                }
                }
                NativeBlockchain {
                    ...tokenDataListing 
                }             
            }     
            }
            
            pageInfo {
            ...tokenPageData
            }            
        }
    }
    `,
    tokenRecordsList: gql`
        fragment tokenDataListing on TokenRecord_Nativeblockchain {
            tokenId
            dltType
            dtiType
            fieldGroupName
            genesisBlockHash
            genesisBlockHashAlgorithm
            genesisBlockUtcTimestamp
            longName
            originalLanguageLongName
            originalLanguageShortName
            publicDistributedLedgerIndicator
            referenceImplementationUrl
            shortName
            unitMultiplier
            auxiliaryDigitalTokenDistributedLedger
            auxiliaryDigitalTokenMechanism
            auxiliaryDigitalTokenTechnicalReference
            digitalTokenExternalIdentifiers
            forks
            functionallyFungibleDtisList
            underlyingAssetExternalIdentifiers
            dtiStatus
        }

        fragment tokenPageData on WPPageInfo {
            hasNextPage
            hasPreviousPage
            endCursor
            startCursor
        }

        query GetTokenList( 
        $after: String
        $before: String
        $first: Int
        $last: Int
        ) {
            tokenRecords( 
            after: $after
            before: $before
            first: $first
            last: $last
            ) {
            edges {
                cursor
                node {
                slug
                id
                NativeBlockchain {
                    ...tokenDataListing 
                }
                }     
            }
            pageInfo {
                ...tokenPageData
            }            
        }
    }
    `,
    tokenRecordsInformativeAttributes: gql`
            fragment tokenDataInformative on TokenRecord_Nativeblockchain {
                tokenId            
                longName
                originalLanguageLongName
                originalLanguageShortName
                publicDistributedLedgerIndicator
                referenceImplementationUrl
                shortName
                unitMultiplier            
                digitalTokenExternalIdentifiers            
                underlyingAssetExternalIdentifiers            
                }

            fragment tokenPageData on WPPageInfo {
                hasNextPage
                hasPreviousPage
                endCursor
                startCursor
            }

            query GetInformativeAttributes
                ( 
                    $tokenid: String        
                ) 
                {
                tokenRecords( 
        
                where: {
                metaQuery:{
                    relation: OR
                    metaArray:[
                    { key: "token_id",   value: $tokenid,   compare: IN }
                    ]
                }
                }
                ) {
                edges {
                cursor
                node {
                    slug
                    id                            
                    tags {
                    nodes{
                        id
                        name
                        slug
                    }
                    }
                    NativeBlockchain {
                        ...tokenDataInformative 
                    }             
                }     
                }
                
                pageInfo {
                ...tokenPageData
                }            
                }
        }`
}