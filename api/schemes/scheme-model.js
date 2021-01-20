const db = require('../../data/db-config');

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove,
    addStep
}

function find() {
    return db('schemes')
}

function findById(id) {
    const schemeObj = db('schemes').where({id}).first()
    if(!schemeObj) {
        return null
    } else {
        return schemeObj
    }
}

function findSteps(id) {
    return db('steps as st')
        .join('schemes as sc', 'sc.id', 'st.scheme_id')
        .select('st.id', 'sc.scheme_name', 'st.step_number', 'st.instructions')
        .orderBy('st.step_number')
        .where({'sc.id': id})
}

function add(data) {
    return db('schemes')
        .insert(data, 'id')
        .then((ids) => {
            const id = ids[0]
            return findById(id)
        })
}

function update(changes, id) {
    return db('schemes')
        .where({id})
        .update(changes)
        .then(count => findById(id))
}

function remove(id) {
    return db('schemes')
        .where({id})
        .del()
}

// Stretch
function addStep(step, scheme_id) {
    const newStep =  {
        ...step,
        scheme_id
    }
    return db('steps')
    .insert(newStep).then(id => db('steps').where({id: id[0]}))
}