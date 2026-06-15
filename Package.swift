// swift-tools-version:5.3

import Foundation
import PackageDescription

var sources = ["src/parser.c"]
if FileManager.default.fileExists(atPath: "src/scanner.c") {
    sources.append("src/scanner.c")
}

let package = Package(
    name: "TreeSitterLockstep",
    products: [
        .library(name: "TreeSitterLockstep", targets: ["TreeSitterLockstep"]),
    ],
    dependencies: [
        .package(name: "SwiftTreeSitter", url: "https://github.com/tree-sitter/swift-tree-sitter", from: "0.9.0"),
    ],
    targets: [
        .target(
            name: "TreeSitterLockstep",
            dependencies: [],
            path: ".",
            sources: sources,
            resources: [
                .copy("queries")
            ],
            publicHeadersPath: "bindings/swift",
            cSettings: [.headerSearchPath("src")]
        ),
        .testTarget(
            name: "TreeSitterLockstepTests",
            dependencies: [
                "SwiftTreeSitter",
                "TreeSitterLockstep",
            ],
            path: "bindings/swift/TreeSitterLockstepTests"
        )
    ],
    cLanguageStandard: .c11
)
