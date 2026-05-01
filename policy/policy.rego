package main

import rego.v1

# Deny if public access is enabled
deny contains msg if {
    # input.public == false
    input.public==false  
    msg = "Public access is not allowed"
}

# Deny if environment is not production-safe
deny contains msg if {
    input.env == "dev"
    msg = "Deployment from dev environment is not allowed"
}