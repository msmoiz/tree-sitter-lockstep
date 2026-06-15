import XCTest
import SwiftTreeSitter
import TreeSitterLockstep

final class TreeSitterLockstepTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_lockstep())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Lockstep grammar")
    }
}
