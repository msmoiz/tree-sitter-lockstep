package tree_sitter_lockstep_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_lockstep "github.com/msmoiz/lockstep/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_lockstep.Language())
	if language == nil {
		t.Errorf("Error loading Lockstep grammar")
	}
}
