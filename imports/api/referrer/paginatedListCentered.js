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

    let min = maxRank - minRank >= 2 ? minRank : Math.min(1, minRank - 1)
    let max = maxRank - minRank >= 2 ? maxRank : maxRank + 1
    console.log(min, max)
    let prevMin, prevMax
    let count = 0, prevCount = -1
    prevMin = min + 1
    prevMax = max - 1
    const referrers = []
    while(count < minCount && count > prevCount) {
      prevCount = count
      count += (
        getReferrers(Referrers, {
          from:   min,
          to:     prevMin,
          fields: {_id: 1},
        }).count()
        +
        getReferrers(Referrers, {
          from:   prevMax,
          to:     max,
          fields: {_id: 1},
        }).count()
      )
      console.log(count)
      prevMin   = min
      prevMax   = max
      min = Math.max(1, min - 1)
      max = max + 1
    }
    return getReferrers(
      Referrers,
      {
        from:   prevMin,
        to:     prevMax,
        fields: Referrers.publicFields,
      }
    )
  }
}

function getReferrers(Referrers, {from, to, fields}) {
  console.log("getReferrers", from, to)
  return Referrers.find(
    {rank: {$gte: from, $lt: to}},
    {
      fields,
      sort:   {rank: 1},
    }
  )
}

function countInArray(arr) {
  return arr.map(cursor => cursor.count())
  .map(c => {console.log(c);return c})
  .reduce((acc, count) => acc + count, 0)
}
