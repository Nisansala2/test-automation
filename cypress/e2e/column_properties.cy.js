describe("Column Properties Modal", () => {
  const ADMIN_EMAIL = "rohana@example.com";
  const ADMIN_PASSWORD = "hefnu6-veDvez-domcen";

  beforeEach(() => {
    cy.login(ADMIN_EMAIL, ADMIN_PASSWORD);
  });

  it('should create migration flow "test column prop" if it does not exist', () => {
    const flowName = "test column prop";

    // Navigate to the flow (creates it if it doesn't exist)
    cy.getOrCreateFlow(flowName);

    // Only reload tables if no tables are persisted yet
    cy.get("body").then(($body) => {
      const noTablesPersisted = $body
        .text()
        .includes(
          "No tables persisted yet. Click the save icon above to load tables from IFS.",
        );

      if (noTablesPersisted) {
        cy.log("No tables persisted, reloading tables from source...");
        // Reload tables from source
        cy.get('[title="Reload tables from source"]').click();
        cy.contains("Saving tables snapshot...", { timeout: 60000 }).should(
          "not.exist",
        );
      } else {
        cy.log("Tables already persisted, skipping reload.");
      }
    });

    // Search for SupplierInfo
    const searchPlaceholder = "Search: ^start, end$, ^exact$, includes";
    cy.get(`input[placeholder="${searchPlaceholder}"]`)
      .clear()
      .type("SupplierInfo");

    // Add 'SupplierInfo' table only if it exists
    cy.get("body").then(($body) => {
      if ($body.find('[title="SupplierInfo"] > span').length > 0) {
        cy.log("SupplierInfo found, clicking to add...");
        cy.get('[title="SupplierInfo"] > span').click();
      } else {
        cy.log("SupplierInfo not found in the list.");
      }
    });

    // Click synchronize database and wait for popup to close
    cy.get('[title="Synchronize database"]').click();
    cy.contains("Synchronizing database", { timeout: 60000 }).should(
      "not.exist",
    );

    // Click the button after adding the table
    cy.get(".sc-gjTGSA > button > .sc-kFuwaP").click();

    // Click download from source and wait for download to complete
    cy.get('[title="Download from source"]').click();
    cy.contains("Download completed (download)", { timeout: 120000 }).should(
      "be.visible",
    );

    //close download modal
    cy.get(":nth-child(2) > .dMqmKY").click();

    // Click on the 1st column and opens the porperty modal
    cy.get(
      '[style="cursor: pointer; background-color: rgb(243, 242, 241); width: 103px; max-width: 103px; position: relative;"] > .sc-dmqHEX > .sc-gjTGSA',
    ).click();

    // Enter test label name
    cy.get(":nth-child(2) > .field-input").clear().type("Supplier Id Test");

    // Enter test description
    cy.get(".field-textarea").clear().type("Test");

    // Decimal point 
    cy.get(":nth-child(9) > .field-input").clear().type("0");

    // Default value
    cy.get(":nth-child(10) > .field-input").clear().type("000");

    // Padding left
    cy.get(":nth-child(11) > .field-input").clear().type("xx");

    // Padding right
    cy.get(":nth-child(12) > .field-input").clear().type("xx");

    // Intercept the apply changes API call
    cy.intercept("PUT", "**/api/migration/meta/table/attribute*").as(
      "applyChanges",
    );

    // Click apply changes button
    cy.get(".button-primary").click();

    // Check that apply changes API succeeded with status 200
    cy.wait("@applyChanges").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
      cy.log("Apply changes API succeeded");
    });

    // Refresh the page to verify data persistence
    cy.reload();

    // Wait for 2 seconds
    cy.wait(2000);

    // Reopen the column properties modal
    // Click on the first column
    // Click on the 1st column and opens the porperty modal
    cy.get(
      '[style="cursor: pointer; background-color: rgb(243, 242, 241); width: 103px; max-width: 103px; position: relative;"] > .sc-dmqHEX > .sc-gjTGSA',
    ).click();


    // Verify all the saved values are persisted
    cy.get(":nth-child(2) > .field-input").should(
      "have.value",
      "Supplier Id Test",
    );
    cy.get(".field-textarea").should("have.value", "Test");
    cy.get(":nth-child(10) > .field-input").should("have.value", "000");
    cy.get(":nth-child(11) > .field-input").should("have.value", "xx");
    cy.get(":nth-child(12) > .field-input").should("have.value", "xx");

    cy.log("✅ All values verified after page refresh!");
  });

  // it("should open Column Properties modal and apply changes", () => {
  //   // --- OPEN MODAL ---
  //   // Click on a column header to open the modal (excluding the first two system columns)
  //   // We target the 3rd column (index 2) or a specific column by name if known
  //   cy.get('[data-testid="records-table"] thead th')
  //     .eq(3) // Adjust index to pick a safe column (e.g., Email or Name)
  //     .click();

  //   // Verify modal is visible
  //   cy.contains("Column Properties").should("be.visible");
  //   cy.get(".panel-footer").should("be.visible");

  //   // --- TEST INPUTS ---

  //   // 1. Label
  //   cy.contains("label", "Label").next("input").as("labelInput");
  //   cy.get("@labelInput").should("be.visible");
  //   const newLabel = "Updated Label " + Date.now();
  //   cy.get("@labelInput").clear().type(newLabel);

  //   // 2. Type (Read-only)
  //   cy.contains("label", "Type").next("input").should("be.disabled");

  //   // 3. Description
  //   cy.contains("label", "Description").next("textarea").as("descInput");
  //   cy.get("@descInput")
  //     .clear()
  //     .type("This is a test description for Cypress.");

  //   // 4. Options (Mandatory / Visible)
  //   // Mandatory
  //   cy.contains("Mandatory").parent().click(); // Toggle checkbox

  //   // Visible
  //   // Note: If you uncheck 'Visible', the column might disappear after apply, possibly breaking subsequent tests if not handled.
  //   // We'll toggle it twice to leave it visible.
  //   cy.contains("Visible").parent().click();
  //   cy.contains("Visible").parent().click();

  //   // 5. Conversion List (Custom Selector)
  //   cy.contains("label", "Conversion List").next().click(); // Open dropdown
  //   // Assuming standard React Select or similar structure, adjust if needed
  //   // cy.contains('OptionName').click(); // Select an option if available

  //   // 6. Reference
  //   cy.contains("label", "Reference").next("input").type("IsoCountry");

  //   // 7. Decimal Point (if numeric, or generally check visibility)
  //   // This input might not exist if type is not numeric, wrap in conditional check or just check existence if applicable
  //   cy.get("body").then(($body) => {
  //     if ($body.find('input[placeholder="."]').length > 0) {
  //       cy.get('input[placeholder="."]').type(".");
  //     }
  //   });

  //   // 8. Pad Left/Right
  //   cy.contains("label", "Pad Left Characters").next("input").type("0");
  //   cy.contains("label", "Pad Right Characters").next("input").type(" ");

  //   // --- APPLY CHANGES ---
  //   cy.contains("button", "Apply").click();

  //   // --- VERIFICATION ---
  //   // Verify modal closes
  //   cy.contains("Column Properties").should("not.exist");

  //   // Verify Label Change in Table Header
  //   // Note: Reload might be needed if state isn't instant, but usually it is.
  //   cy.get('[data-testid="records-table"] thead th')
  //     .contains(newLabel)
  //     .should("be.visible");
  // });
});
