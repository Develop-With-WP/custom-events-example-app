const Events = {
    events: {},
    emit: function( eventName, data ) {
        if ( this.events[eventName] ) {
            this.events[eventName].forEach( (fn) => fn( data ) );
        }
    },
    subscribe: function( eventName, fn ) {
        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push( fn );
    },
    unsubscribe: function( eventName, fn ) {
        if ( this.events[eventName] ) {
            this.events[eventName] = this.events[eventName]
            .filter( ( item ) => {
                return item !== fn
            } );
        }
    }
}

let state = {
    people: [ 'Bobby Bryant' ],
    listEl: document.querySelector( '.people-list' )
}

const updatePeople = ( state ) => {
    state.listEl.innerHTML = '';
    state.people.forEach( ( person )  => {
        const listEl = document.createElement( 'li' );
        listEl.innerHTML = person;
        state.listEl.appendChild( listEl );
    } );
}

Events.subscribe( 'updatePeople', updatePeople );

const addPerson = ( state, person ) => {
    const newState = Object.assign(
        state,
        {
            people: state.people.concat( [ person ] )
        }
    );

    Events.emit( 'updatePeople', newState );
    return newState;
}

const removePerson = ( state, person ) => {
    const newState = Object.assign(
        state,
        {
            people: state.people.filter( ( item ) => item !== person )
        }
    );

    Events.emit( 'updatePeople', newState );
    return newState;
}

document.addEventListener( 'DOMContentLoaded', () => {
    updatePeople( state );

    setTimeout( () => {
        state = addPerson( state, 'John Johnson' );
    }, 2000 );

    setTimeout( () => {
        state = addPerson( state, 'Tommy Thompson' );
        state = removePerson( state, 'Bobby Bryant' );
    }, 2000 );

} );
