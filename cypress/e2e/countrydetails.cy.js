describe("Country Details API", () => {
    it("fetch country details for specified country code", () => {
      const countryCode = "IN";
      cy.request({
        method: "POST",
        url: "https://countries.trevorblades.com/",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          query: `
            query SingleCountriesDetails($countryCode: [String!]) {
              countries(filter: { code: { in: $countryCode } }) {
                code
                name
                awsRegion
                currency
                phone
                native
                emoji
                capital
                phones
                currencies
                continent {
                  name
                }
                languages {
                  name
                }
              }
            }
          `,
          variables: { countryCode: [countryCode] },
        },
      }).then((response) => {
        // first we will verify the response status code
        expect(response.status).to.eq(200);
  
        // second verify the response body contains data
        expect(response.body).to.have.property("data");
  
        //then in last verify the response body contains for country details
        const countryDetails = response.body.data.countries[0];
        expect(countryDetails).to.have.property("code", countryCode);
        expect(countryDetails).to.have.property("name");
        expect(countryDetails).to.have.property("awsRegion");
        expect(countryDetails).to.have.property("currency");
        expect(countryDetails).to.have.property("phone");
        expect(countryDetails).to.have.property("native");
        expect(countryDetails).to.have.property("emoji");
        expect(countryDetails).to.have.property("capital");
        expect(countryDetails).to.have.property("phones");
        expect(countryDetails).to.have.property("currencies");
        expect(countryDetails).to.have.property("continent");
        expect(countryDetails.continent).to.have.property("name");
        expect(countryDetails).to.have.property("languages").to.be.an("array").that.is.not.empty;
      });
    });
  });
  