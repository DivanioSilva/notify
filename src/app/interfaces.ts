export interface EventResponse{
    event: EmergencyEvent;
    links: Links;
}

export interface EmergencyEvent{
    id: number;
    created: Date;
    caller: Caller;
    dialed: String;
}

export interface Caller{
    id: String;
    firstName: String;
    lastName: String;
    phone: String;
    address: Address;
}

export interface Address{
    street1: String;
    street2: String;
    city: String;
    state: String;
    zip: String;
}

export interface Achnowledgement{
    timestamp: Date;
    user: String;
    note: String;
}

export interface Links{
    self: String;
    next: String;
    acknowledgements: String;
}