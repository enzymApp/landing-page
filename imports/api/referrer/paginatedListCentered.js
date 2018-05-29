import SimpleSchema from 'simpl-schema'

export default (Referrers) => {
  Referrers.paginatedListCentered = (minCount, minRank, maxRank) => {
    console.log("get list of referrers", minCount, minRank, maxRank)
    new SimpleSchema({
      minCount: {
        type: SimpleSchema.Integer,
        min:  1,
      },
      minRank: {
        type:     SimpleSchema.Integer,
        min:      1,
      },
      maxRank: {
        type:     SimpleSchema.Integer,
        min:      1,
      },
    }).validate({minCount, minRank, maxRank})

    let referrers
    let fromRank = minRank
    let toRank   = maxRank
    if(!fromRank || !toRank) {
      const {rank} = Referrers.findOne({userId})
      fromRank = Math.max(1, rank - 1)
      toRank   = rank + 1
    }
    do {
      referrers = Referrers.find({rank: {$gte: fromRank, $lte: toRank}})
      fromRank = Math.max(1, fromRank - 1)
      toRank   = toRank + 1
    }
    while(referrers.count() > minCount)
    return referrers
  }
}
